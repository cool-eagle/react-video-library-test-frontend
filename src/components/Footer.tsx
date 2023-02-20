import React from 'react'

const Footer = () => {
  return (
    <footer className="h-50 bg-slate-900 py-4">
      <div className="w-5/6 mx-auto">
        <div className="flex lg:flex-row flex-col justify-between text-center">
          <p className="text-2xl text-gray-100">
            This site was developed for testing.
          </p>
          <p className="text-md text-gray-100">
            &#169;2023 The Video Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer