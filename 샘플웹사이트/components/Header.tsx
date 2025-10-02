import { Search, User, Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="w-full bg-white border-b">
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">신</span>
            </div>
            <span className="font-bold text-lg">신용협회장학재단</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-orange-500 font-medium">재무조성 지원</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">상법 출 연결적지원</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">금융서비스지원</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">정법의 홍보</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">소득직 참여</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">위법의 소개</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span>센터문의</span>
            <span className="font-bold text-orange-500 ml-2">1600-5500</span>
          </div>
          <Search className="w-5 h-5 text-gray-600" />
          <User className="w-5 h-5 text-gray-600" />
          <Menu className="w-5 h-5 text-gray-600 md:hidden" />
        </div>
      </div>
    </header>
  )
}