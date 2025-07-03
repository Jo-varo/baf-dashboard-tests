interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button = ({ onClick, children, style, }: Props) => {

  return (
    <button onClick={onClick} type="button" style={{ padding: '5px 10px', color: 'white', fontWeight: 'normal', fontSize: '12px', ...style }}>
      {children}
    </button>
  )
}