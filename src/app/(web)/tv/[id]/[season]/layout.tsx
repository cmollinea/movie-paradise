type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const Layout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
