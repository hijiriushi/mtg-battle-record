import Link from 'next/link'

export default function Navbar({ children }) {
    return (
    <div className="w-full flex text-gray-900 font-bold text-sm items-center bg-blue-100 fixed bottom-0 right-0 left-0 shadow">
        <div className="w-1/3 py-5 text-center">
        <Link href="/result">
            <a>戦績登録</a>
          </Link>
          </div>
          <div className="w-1/3 py-5 text-center">
          <Link href="/deck">
            <a>デッキ登録</a>
          </Link>
          </div>
          <div className="w-1/3 py-5 text-center">
          <Link href="/history">
            <a>戦歴確認</a>
          </Link>
          </div>
    </div>
    )
}