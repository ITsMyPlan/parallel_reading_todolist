import StatusBadge from '@/components/common/StatusBadge'; 
  
function StatusFilter() {
  const types = ['all', 'progress', 'todo', 'done']

  return <div className="mt-10">
    {
      types.map((type, index) => {
        return <StatusBadge key={index}>{type}</StatusBadge>
      })
    }
  </div>
}
export default StatusFilter;