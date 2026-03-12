'use client'

import React, { useState, useMemo } from 'react'
import { Search, Plus, Trash, Download, MoreVertical, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
type Student = {
  key: string
  initial: string
  name: string
  email: string
  status: string
  completed: number
  applications: number
  interviews: number
  profileImage?: string | null
}

// ────────────────────────────────────────────────
// API fetch functions
// ────────────────────────────────────────────────
const deleteStudent = async ({ id, token }: { id: string; token: string }) => {
  if (!token) throw new Error('No authentication token')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/school-management/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    const errorJson = await res.json()
    throw new Error(errorJson.message || 'Failed to delete student')
  }

  return res.json()
}

const fetchStudents = async (token: string | undefined): Promise<Student[]> => {
  if (!token) throw new Error('No authentication token')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/school-management/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch students: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const studentsData = json?.data


  if (!Array.isArray(studentsData)) {
    console.error('Expected array in response.data.data but got:', studentsData)
    return []
  }

  return studentsData.map((student: any) => {
    const profile = student.profile || {}
    const invite = student.invite || {}
    const stats = student.stats || {}

    const name = invite.name || 'Unknown'
    const email = profile.email || invite.email || 'N/A'
    const status = profile.status || 'unknown'

    // As per the image, completed could be string percentage or number.
    // If stats just gives totalAssessments, we mapped it directly.
    // You could also compute percentage if maxAssessments was known.
    // Assuming backend totalAssessments maps to completed.
    const completed = stats.totalAssessments || 0
    const applications = stats.totalApplications || 0
    const interviews = 0

    let initial = '?'
    if (name !== 'Unknown') {
      const names = name.split(/\s+/).filter(Boolean)
      if (names.length >= 2) {
        initial = (names[0][0] + names[1][0]).toUpperCase()
      } else {
        initial = names[0].slice(0, 2).toUpperCase()
      }
    }

    return {
      key: profile._id || invite._id || Math.random().toString(),
      initial,
      name,
      email,
      status,
      completed,
      applications,
      interviews,
      profileImage: profile.profileImage || null,
    }
  })
}

// ────────────────────────────────────────────────
// Skeleton Row
// ────────────────────────────────────────────────
function StudentRowSkeleton() {
  return (
    <TableRow className="h-20 border-b border-gray-100">
      <TableCell className="px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
      </TableCell>
      <TableCell className="px-4 sm:px-6">
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
      </TableCell>
      <TableCell className="px-4 sm:px-6 text-center">
        <div className="inline-block px-3 py-1 h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
      </TableCell>
      <TableCell className="px-4 sm:px-6">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-300 rounded-full w-3/4 animate-pulse" />
          </div>
          <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </TableCell>
      <TableCell className="px-4 sm:px-6 text-center">
        <div className="h-5 w-8 mx-auto bg-gray-200 rounded animate-pulse" />
      </TableCell>
      <TableCell className="px-4 sm:px-6 text-center">
        <div className="h-5 w-8 mx-auto bg-gray-200 rounded animate-pulse" />
      </TableCell>
      <TableCell className="px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="w-6 h-6 bg-red-200 rounded-full animate-pulse" />
        </div>
      </TableCell>
    </TableRow>
  )
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function ManageStudentsTable() {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const token = session?.accessToken as string | undefined

  const [searchText, setSearchText] = useState('')
  const [filterStatus, setFilterStatus] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)

  // Deletion state
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const pageSize = 6

  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery<Student[]>({
    queryKey: ['students', token],
    queryFn: () => fetchStudents(token),
    enabled: !!token && sessionStatus === 'authenticated',
    staleTime: 3 * 60 * 1000,
  })

  const students = data ?? []

  const filteredData = useMemo(() => {
    let result = students

    if (filterStatus !== 'All Status') {
      const isActive = filterStatus === 'Active'
      result = result.filter(item =>
        isActive
          ? item.status.toLowerCase().includes('active')
          : !item.status.toLowerCase().includes('active'),
      )
    }

    if (searchText.trim()) {
      const query = searchText.toLowerCase()
      result = result.filter(item => item.name.toLowerCase().includes(query))
    }

    return result
  }, [students, searchText, filterStatus])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage])

  const total = filteredData.length
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, total)
  const showingText =
    total === 0
      ? 'Showing 0 students'
      : `Showing ${startItem}-${endItem} of ${total} students`

  const hasPrevious = currentPage > 1
  const hasNext = currentPage * pageSize < total

  const handleDelete = (student: Student) => {
    setStudentToDelete(student)
    setIsDeleteDialogOpen(true)
  }

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success('Student deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['students', token] })
      setIsDeleteDialogOpen(false)
      setStudentToDelete(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete student')
    },
  })

  const confirmDelete = () => {
    if (studentToDelete && token) {
      deleteMutation.mutate({ id: studentToDelete.key, token })
    }
  }

  const handleExport = () => {
    if (!filteredData.length) return;

    // Javascript best practice for CSV generation from JSON data
    const headers = [
      "Student Name",
      "Email",
      "Status",
      "Completed Assessments",
      "Applications",
      "Interviews"
    ];

    // Note: completed here might be a number but display shows "%", 
    // appending % for CSV if that's preferred.
    const csvContent = [
      headers.join(","),
      ...filteredData.map(s => {
        // Escape quotes if any exist in data
        const row = [
          `"${s.name.replace(/"/g, '""')}"`,
          `"${s.email.replace(/"/g, '""')}"`,
          `"${s.status.replace(/"/g, '""')}"`,
          `"${s.completed}%"`,
          `"${s.applications}"`,
          `"${s.interviews}"`
        ];
        return row.join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (sessionStatus === 'loading' || isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-6 gap-4 bg-white rounded-[24px]">
          <div className="h-12 w-full sm:w-96 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="flex gap-3">
            <div className="h-12 w-48 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-[#E5E5E5] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FFFEF0]">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="h-14 px-6 min-w-[200px]">
                    Student Name
                  </TableHead>
                  <TableHead className="h-14 px-6 min-w-[220px]">
                    Email
                  </TableHead>
                  <TableHead className="h-14 px-6 text-center min-w-[140px]">
                    Status
                  </TableHead>
                  <TableHead className="h-14 px-6 text-center min-w-[150px]">
                    Completed Assessments
                  </TableHead>
                  <TableHead className="h-14 px-6 text-center min-w-[110px]">
                    Applications
                  </TableHead>
                  <TableHead className="h-14 px-6 text-center min-w-[100px]">
                    Interviews
                  </TableHead>
                  <TableHead className="h-14 px-6 text-center min-w-[280px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <StudentRowSkeleton key={i} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load students: {(error as Error).message}
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-14">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 gap-3 sm:gap-4 bg-white rounded-[24px]">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search students..."
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full h-12 pl-12 rounded-2xl border-2 border-transparent bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-yellow-400 text-base"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Select
            value={filterStatus}
            onValueChange={v => {
              setFilterStatus(v)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-gray-200 font-medium">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="h-12 px-4 rounded-xl border-gray-200 font-medium whitespace-nowrap bg-white text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>

          <Link href="/school/invite-students">
            <Button
              size="sm"
              className="h-12 px-4 rounded-xl bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-black font-bold whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Student</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-[24px] border-2 border-[#E5E5E5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#FFFEF0]">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 min-w-[140px] sm:min-w-[200px]">
                  Student Name
                </TableHead>
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 min-w-[160px] sm:min-w-[220px]">
                  Email
                </TableHead>
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 text-center min-w-[110px] sm:min-w-[140px]">
                  Status
                </TableHead>
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 text-center min-w-[150px]">
                  Completed Assessments
                </TableHead>
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 text-center min-w-[110px]">
                  Applications
                </TableHead>
                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 text-center min-w-[100px]">
                  Interviews
                </TableHead>

                <TableHead className="font-bold text-[#1E1E1E] h-14 px-4 sm:px-6 text-center min-w-[200px] sm:min-w-[280px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-gray-500"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(student => (
                  <TableRow
                    key={student.key}
                    className="h-20 hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="px-4 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="w-10 h-10 border shadow-sm flex-shrink-0">
                          <AvatarImage
                            src={student.profileImage ?? undefined}
                            alt={student.name}
                          />
                          <AvatarFallback
                            className={cn(
                              'text-black font-bold text-sm',
                              student.profileImage
                                ? 'bg-gray-200'
                                : 'bg-[#FFFF00]',
                            )}
                          >
                            {student.initial}
                          </AvatarFallback>
                        </Avatar>

                        <span className="font-bold text-gray-900 truncate">
                          {student.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 sm:px-6 text-gray-600 font-medium text-sm truncate">
                      {student.email}
                    </TableCell>

                    <TableCell className="px-4 sm:px-6 text-center">
                      <Badge
                        className={cn(
                          'px-3 py-1 font-bold text-xs sm:text-sm',
                          student.status.toLowerCase().includes('active')
                            ? 'bg-[#FFFF00] text-[#1E1E1E] hover:bg-[#FFFF00]'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100',
                        )}
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 sm:px-6">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-full max-w-[120px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FFFF00] rounded-full transition-all duration-500"
                            style={{ width: `${student.completed}%` }}
                          />
                        </div>
                        <span className="font-medium text-gray-500 text-xs min-w-fit">
                          {student.completed}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 sm:px-6 text-center font-medium text-gray-700 text-sm">
                      {student.applications}
                    </TableCell>

                    <TableCell className="px-4 sm:px-6 text-center font-medium text-gray-700 text-sm">
                      {student.interviews}
                    </TableCell>

                    <TableCell className="px-4 sm:px-6">
                      <div className="flex gap-3 justify-center items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-none shadow-[0px_8px_24px_rgba(0,0,0,0.12)] min-w-[110px] p-1 rounded-xl">
                            <DropdownMenuItem
                              className="text-red-500 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 focus:bg-red-50 focus:text-red-500 transition-colors"
                              onClick={() => handleDelete(student)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="text-sm font-semibold text-red-600">Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-t border-[#E5E5E5] gap-4">
          <span className="text-xs sm:text-sm font-bold text-gray-500">
            {showingText}
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={!hasPrevious}
              className="rounded-full px-4 sm:px-6 font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            >
              Previous
            </Button>

            <div className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black bg-[#FFFF00] rounded-full shadow-md">
              {currentPage}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={!hasNext}
              className="rounded-full px-4 sm:px-6 font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-bold text-gray-900">
                {studentToDelete?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete Student'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
