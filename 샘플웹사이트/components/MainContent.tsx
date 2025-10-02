import { useState } from 'react'
import { Calendar, Download, Printer, Share2 } from 'lucide-react'
import { CompareModal } from './CompareModal'

export function MainContent() {
  const [compareModalOpen, setCompareModalOpen] = useState(false)

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        홈 &gt; 재무조성 지원 &gt; 일정정 제무조정
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">일정정 제무조정</h1>
          <div className="flex items-center gap-2">
            <button><Printer className="w-4 h-4 text-gray-600" /></button>
            <button><Share2 className="w-4 h-4 text-gray-600" /></button>
            <button><Download className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded flex items-center gap-2">
          <span className="text-blue-600 text-sm">ℹ️</span>
          <span className="text-sm text-blue-800">
            신법적 더불경 화의개혁 등을 톰화 재무조정으로 소객됩니다.
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">재화여 한화위수</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-right"
                />
                <div className="text-xs text-gray-600 mt-1">화외</div>
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-right"
                />
                <div className="text-xs text-gray-600 mt-1">방식</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">재화여 한화위 그룹기과법</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-right"
                />
                <div className="text-xs text-gray-600 mt-1">화외</div>
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-right"
                />
                <div className="text-xs text-gray-600 mt-1">방식</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-2">물리범적</label>
            <select className="w-full border rounded px-3 py-2">
              <option>주의사애</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">물리실신</label>
            <select className="w-full border rounded px-3 py-2">
              <option>생활자산</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compare Section */}
      <div className="bg-blue-900 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>비교하기</span>
            <span className="text-sm">선택한 상품</span>
            <span className="text-sm">재민금리와제회용육자금</span>
          </div>
          <button 
            onClick={() => setCompareModalOpen(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            비교
          </button>
        </div>
      </div>

      {/* Quick Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">조치</div>
            <button className="w-full bg-orange-500 text-white py-2 rounded">
              직접신청 상담요청
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-bold mb-4">간단한만 결과</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <span className="text-orange-500 text-sm">📊</span>
              </div>
              <div>
                <div className="font-medium text-sm">사전제무조정</div>
                <div className="text-xs text-gray-600">
                  사과처 <span className="font-bold">10,000명법</span>
                  A이법명 <span className="font-bold">A4직련법</span>
                  수실정 <span className="font-bold">2.8%</span>
                </div>
              </div>
              <div className="ml-auto">
                <button className="text-xs bg-gray-100 px-2 py-1 rounded">상담신청</button>
                <button className="text-xs bg-orange-500 text-white px-2 py-1 rounded ml-1">선택하기</button>
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-600 mt-4">자제용 더보기 →</button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="font-bold mb-4">또 다른 정보하기</h3>
        
        <div className="space-y-4">
          {[
            {
              title: "회법적 청법제",
              subtitle: "회법화제도청법제중계",
              description: "신법적 더불경(B2B) 상의 금융서해법",
              tags: ["상담신청", "선택하기"]
            },
            {
              title: "회법적 금과법",
              subtitle: "회법화제도 청법",
              description: "신법적 더불경(B2B) 상의 금융서해법",
              tags: ["상담신청", "선택하기"]
            },
            {
              title: "회법적 청법제",
              subtitle: "또 다이벌 제과법",
              description: "신법적 더불경(B2B) 상의 금융서해법을 화의 등용 사법약 대합 대사",
              tags: ["상담신청", "선택하기"]
            },
            {
              title: "회법적 법제",
              subtitle: "또 다사법제화법제중계",
              description: "신법적 더불경(B2B) 상의 금주서해법",
              tags: ["상담신청", "선택하기"]
            },
            {
              title: "회법적 청법제",
              subtitle: "대법의 상법화대법제중업대법",
              description: "신법적 화법 상의 화법 금융법",
              tags: ["상담신청", "선택하기"]
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded">
              <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                <span className="text-yellow-600 text-sm">📋</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <div className="text-xs text-gray-600">{item.subtitle}</div>
                <div className="text-xs text-gray-600 mt-1">{item.description}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-gray-100 px-2 py-1 rounded">상담신청</button>
                <button className="text-xs bg-orange-500 text-white px-2 py-1 rounded">선택하기</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="text-sm text-blue-600">더보기 →</button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-50 rounded-lg p-6 mt-6">
        <p className="text-sm text-center mb-4">
          해 계약서의 상법적윈 리웰의 태시적 사안에 자료 개인정보생성이 상법
        </p>
        
        <div className="flex gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="이메일 주소"
            className="flex-1 border rounded px-3 py-2"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded">구독</button>
        </div>
      </div>

      <CompareModal 
        isOpen={compareModalOpen} 
        onClose={() => setCompareModalOpen(false)} 
      />
    </main>
  )
}