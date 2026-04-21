export function css(strings: TemplateStringsArray, ...values: Array<string | number>): string {
  return String.raw({ raw: strings }, ...values)
}
