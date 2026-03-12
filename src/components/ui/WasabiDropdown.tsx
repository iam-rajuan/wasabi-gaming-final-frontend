import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type WasabiDropdownType = {
  id: number;
  name: string;
  value: string; // ✅ only string allowed
};

const WasabiDropDown = ({
  list,
  selectedValue,
  onValueChange,
  placeholderText,
}: {
  list: WasabiDropdownType[];
  selectedValue: string | undefined; // ✅ only string
  onValueChange: (value: string) => void; // ✅ only string
  placeholderText?: string;
}) => {
  return (
    <Select
      value={
        selectedValue !== "" && selectedValue !== undefined
          ? selectedValue
          : undefined
      }
      onValueChange={(val: string) => {
        onValueChange(val); // ✅ no number conversion
      }}
    >
      <SelectTrigger className="h-[36px] w-[130px] md:w-[140px] lg:w-[160px] bg-[#E9EEF2] border border-[#E6E6E6] rounded-[8px] text-[#0E2A5C] dark:text-black text-base focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0">
        <SelectValue
          className="placeholder:text-[#424242] placeholder:text-base placeholder:font-bold dark:text-black"
          placeholder={placeholderText ?? "Select"}
        />
      </SelectTrigger>

      <SelectContent className="min-w-[unset] w-auto h-[250px] rounded-[8px] shadow-[0px_0px_56px_0px_#00000029] border-none bg-white mt-1">
        <SelectGroup>
          {list
            .filter((item) => item.value !== "")
            .map((item) => (
              <SelectItem
                key={item.id}
                value={item.value} // ✅ already string
                className="text-[#0E2A5C] font-normal text-[16px] leading-normal cursor-pointer"
              >
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WasabiDropDown;

