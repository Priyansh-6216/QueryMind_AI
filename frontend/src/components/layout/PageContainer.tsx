interface PageContainerProps {
  children: React.ReactNode;
  title: string;
}

const PageContainer = ({ children, title }: PageContainerProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {children}
    </div>
  )
}

export default PageContainer