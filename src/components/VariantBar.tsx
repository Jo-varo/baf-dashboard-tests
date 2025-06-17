interface Props {
  variant: string
  children: React.ReactNode
}

export const VariantBar = ({ variant, children }: Props) => (
  <div className="flex gap-4 items-center mt-4">
    <h4 className="flex-2 text-start">{variant}</h4>
    <div className="flex gap-2 flex-8">
      {children}
    </div>
  </div>
)