interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: Props) => {

  return (
    <button onClick={onClick} style={{padding:'5px 10px',color:'white', fontWeight:'normal',fontSize:'12px'}}>
      {children}
    </button>
  )
}