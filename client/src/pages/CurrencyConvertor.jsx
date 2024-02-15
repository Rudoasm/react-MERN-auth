import React from 'react'
import CurrencyRow from '../components/CurrencyRow'
import "./CurrencyConvertor.css"

export default function CurrencyConvertor() {
  return (
    <div className='ccMain'>
      
      <CurrencyRow/>
      <div>&#8644;</div>
      <CurrencyRow/>
    </div>
  )
}
