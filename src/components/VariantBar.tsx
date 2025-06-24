interface Props {
  variant: string
  children: React.ReactNode
}

export const VariantBar = ({ variant, children }: Props) => (
  <div className="flex gap-4 items-center mt-3">
    <h4 className="flex-2 text-start">{variant}</h4>
    <div className="flex gap-x-2 flex-8 flex-wrap gap-y-1">
      {children}
    </div>
  </div>
)