import { ChevronDown } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-4">
        <div className="bg-orange-500 text-white p-3 rounded-lg mb-4">
          <h3 className="font-bold">재무조성 지원</h3>
        </div>
        
        <nav className="space-y-2">
          <div className="text-sm text-gray-600 font-medium">재무조성 협력아</div>
          
          <div className="space-y-1 ml-4">
            <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 py-1">
              신용룰 회복지원
            </a>
            <a href="#" className="block text-sm text-orange-500 py-1 font-medium">
              재무조성 상법 기업든
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 py-1">
              재무신용 회복서비스
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 py-1">
              금융배과 체험종료
            </a>
          </div>
        </nav>
      </div>
    </aside>
  )
}