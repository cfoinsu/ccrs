import { X } from 'lucide-react'

interface CompareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CompareModal({ isOpen, onClose }: CompareModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">비교하기</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <span className="text-orange-500 text-sm">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">재민금리도움</h3>
                  <div className="text-xs text-gray-600">제무조정타담단</div>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">신청방법</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">신과자격</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상과자격</span>
                  <span>상담문의</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 rounded mt-4 text-sm">
                상담문의
              </button>
            </div>

            {/* Card 2 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-500 text-sm">💰</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">재민금리와 제회용육자금</h3>
                  <div className="text-xs text-gray-600">재민금리와제회용육지원</div>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">신청방법</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">신과자격</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상과자격</span>
                  <span>상담문의</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 rounded mt-4 text-sm">
                상담문의
              </button>
            </div>

            {/* Card 3 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-green-500 text-sm">🏢</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">사업제무조정</h3>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">신청방법</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">신과자격</span>
                  <span>상담문의</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상과자격</span>
                  <span>상담문의</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 rounded mt-4 text-sm">
                상담문의
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              닫기
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              상담신청
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}