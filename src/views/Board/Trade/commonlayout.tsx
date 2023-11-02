import React from 'react'
import './style.css'
import Header from '../../../layouts/Header'

const layouts = (props: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Header />

      <main>
        {props.children}
      </main>
      {/* Footer 만들면 여기다 삽입 */}
    </div>
  )
}

export default layouts

