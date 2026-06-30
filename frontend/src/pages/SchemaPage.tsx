import PageContainer from '../components/layout/PageContainer'
import SchemaViewer from '../components/schema/SchemaViewer'

const SchemaPage = () => {
  return (
    <PageContainer title="Database Schema">
      <SchemaViewer />
    </PageContainer>
  )
}

export default SchemaPage