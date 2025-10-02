export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Partner Logos */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 overflow-x-auto">
            <div className="flex items-center gap-2 text-gray-700 min-w-max">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-sm">서울금융지원</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 min-w-max">
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <span className="text-sm">신금융지원대상</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 min-w-max">
              <div className="w-8 h-8 bg-green-600 rounded"></div>
              <span className="text-sm">한국금융최적화원</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 min-w-max">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="text-sm">금융적용지원</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 min-w-max">
              <div className="w-8 h-8 bg-orange-600 rounded"></div>
              <span className="text-sm">한국금융확인대상</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">신</span>
                </div>
                <span className="font-bold text-lg">신용협회장학재단</span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white">이용약관</a>
                  <a href="#" className="hover:text-white">개인정보처리방침</a>
                  <a href="#" className="hover:text-white">이메일주소무단수집거부</a>
                </div>
                
                <p className="mt-4">
                  주소 : 서울시 강남구 태해란로 8번길 17 (역삼동)
                  <br />
                  대표전화 : 02) 2183-2700 센터문의 : 1600-5500
                  <br />
                  팩스 : 02) 508-2288
                </p>
                
                <p className="text-xs text-gray-500 mt-4">
                  1600-5500: 0 일반 전화, 핸드폰 사용가능.
                  <br />
                  (월~금) 09:00~18:00 / (토) 09:00~13:00
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="space-y-2 text-sm text-gray-400">
                <p>전화문의센터</p>
                <p className="text-2xl font-bold text-white">1600-5500</p>
                
                <div className="mt-4">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                    접점시스템 접속하기
                  </button>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                  <div className="w-8 h-8 bg-red-600 rounded"></div>
                  <div className="w-8 h-8 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}