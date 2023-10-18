import { groupSizeOptions } from "@/constants/formInputOptions";

export function replaceLastDotWithColon(input: string) {
  const lastIndex = input.lastIndexOf(".");
  if (lastIndex !== -1) {
    return input.substring(0, lastIndex) + ":" + input.substring(lastIndex + 1);
  }
  return input;
}

export function replaceGroupSizeWithName(input: number) {
  const foundOption = groupSizeOptions.find((el) => el.value === input);
  if (foundOption) {
    return foundOption.label;
  }
}
