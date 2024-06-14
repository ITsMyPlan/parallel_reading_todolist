import React from 'react'

interface HeaderProps {
  children: React.ReactNode
}

function Header(props: HeaderProps) {
  const { children } = props;
  
  return (
    <>
      <header className="flex justify-center text-2xl text-black py-5">{children}</header>
    </>
  )
}

export default Header;
