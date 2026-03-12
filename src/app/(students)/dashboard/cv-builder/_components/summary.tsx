'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FileText } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { CvBuilderFormType } from './cv-making-form'
import { Button } from '@/components/ui/button'
import { useFormState } from './state/useFormState'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Spinner } from '@/components/ui/spinner'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type SummaryProps = {
  form: UseFormReturn<CvBuilderFormType>
  isPending: boolean
  token: string
}

const Summary = ({ form, isPending, token }: SummaryProps) => {
  const { setIsActive, markStepCompleted } = useFormState()
  const [aiSummary, setAiSummary] = useState('')
  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)

  useEffect(() => {
    const subscription = form.watch(value => {
      const summaryValue = value.summary || ''
      setCharacterCount(summaryValue.length)

      if (summaryValue.length >= 10) {
        markStepCompleted('Summary')
      }
    })

    return () => subscription.unsubscribe()
  }, [form, markStepCompleted])

  useEffect(() => {
    if (!isTyping || !aiSummary || typewriterIndex >= aiSummary.length) {
      if (isTyping && aiSummary) {
        form.setValue('summary', aiSummary, { shouldValidate: true })
      }
      setIsTyping(false)
      return
    }

    const timeout = setTimeout(() => {
      const newText = typewriterText + aiSummary[typewriterIndex]
      setTypewriterText(newText)
      setTypewriterIndex(prev => prev + 1)

      form.setValue('summary', newText, { shouldValidate: true })
    }, 20)
    return () => clearTimeout(timeout)
  }, [isTyping, typewriterIndex, aiSummary, form, typewriterText])

  const startTypewriterEffect = (aiText: string) => {
    setAiSummary(aiText)
    setTypewriterText('')
    setTypewriterIndex(0)
    setIsTyping(true)

    form.setValue('summary', '', { shouldValidate: true })
  }

  const { mutateAsync: generateSummary, isPending: summeryPending } =
    useMutation({
      mutationKey: ['cv-making'],
      mutationFn: async (payload: CvBuilderFormType) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cvbuilder`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        )
        return await res.json()
      },
      onSuccess: data => {
        toast.success(data?.message)
        setIsGenerating(false)

        if (data?.data?.summary) {
          setTimeout(() => {
            startTypewriterEffect(data.data.summary)
          }, 300)
        }
      },
      onError: error => {
        toast.error(error.message)
        setIsGenerating(false)
      },
    })

  const handleSummery = async () => {
    setIsGenerating(true)

    const formData = form.getValues()

    try {
      await generateSummary(formData)
    } catch (error) {
      console.log(`error form summery: ${error}`)
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
          <FileText className="h-8" />
        </div>

        <div>
          <h1 className="text-xl font-semibold">Professional Summary</h1>
          <p className="text-gray-600">Brief overview of your career</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary field */}
        <div className="relative">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and leading high-performing teams."
                    {...field}
                    value={isTyping ? typewriterText : field.value || ''}
                    onChange={e => {
                      field.onChange(e.target.value)
                      if (isTyping) {
                        setIsTyping(false)
                        setAiSummary('')
                      }
                    }}
                    className="min-h-[180px] rounded-2xl p-4 border border-gray-100 bg-[#f3f3f5] placeholder:text-gray-500 resize-none"
                  />
                </FormControl>
                <FormMessage />
                {isTyping && (
                  <div className="absolute right-16 top-10">
                    <span className="flex items-center gap-1 text-xs text-blue-500 animate-pulse">
                      <span className="w-2 h-4 bg-blue-500 animate-pulse"></span>
                      AI is writing...
                    </span>
                  </div>
                )}
              </FormItem>
            )}
          />

          <button
            onClick={handleSummery}
            type="button"
            className="absolute right-3 bottom-3"
            disabled={summeryPending || isTyping}
            title="Generate AI summary"
          >
            {summeryPending ? (
              <div className="w-5 h-5 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            ) : (
              <Image
                src={'/details-icon.png'}
                alt="Generate AI Summary"
                width={1000}
                height={1000}
                className="w-5 h-5 transition-opacity hover:opacity-80"
              />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Tip: Keep it concise (3-4 sentences) and highlight your most
            impressive achievements
          </p>

          {/* Character count */}
          <div className="text-sm text-right text-gray-500">
            {form.watch('summary')?.length || 0} characters
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 space-x-4">
          <Button
            onClick={() => setIsActive('Achievements')}
            type="button"
            className="w-24 bg-gray-300 rounded-3xl hover:bg-gray-400/55"
            disabled={summeryPending || isTyping}
          >
            Previous
          </Button>
          <Button
            disabled={isPending || summeryPending || isTyping}
            type="submit"
            className="w-24 rounded-3xl disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner className="w-4 h-4" />
                <span>Saving</span>
              </span>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Summary
