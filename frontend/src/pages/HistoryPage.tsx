import PageContainer from '../components/layout/PageContainer'
import HistoryList from '../components/history/HistoryList'

const HistoryPage = () => {
  return (
    <PageContainer title="Query History">
      <HistoryList />
    </PageContainer>
  )
}

export default HistoryPage