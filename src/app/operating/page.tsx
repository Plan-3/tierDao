'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './form.css'

function page() {
  const [shares, setShares] = useState(false)
  const [filed, setFiled] = useState(false)
  return (
    <div>
      <Link href='/'>Home</Link>
      <div>
        <form action="post">
          <div className='rows'>
            <label htmlFor="EN">Entity Name:</label>
            <input type="text" name="EN" id="" placeholder='Entity Name' />
          </div>
          <div className='rows'>
            <label htmlFor="Business Type">Business Type:</label>
            <select name="Business Type" id="">
              <option value="LLC">LLC</option>
              <option value="S-Corp">S-Corp</option>
              <option value="C-Corp">C-Corp</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='rows'>
            <label htmlFor="Ownership">Ownership:</label>
            <select name="Ownership" id="">
              <option value="Sole">Sole Propriertorship</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>
          <div className='rows'>
            <label htmlFor="InitMems" style={{ fontSize: '.8rem' }}>Initial Members. Please seperate members with a comma:</label>
            <input type="text" name="InitMems" id="" placeholder='Initial Members' />
          </div>
          <h4>Articles Filed</h4>
          <div className='rows'>
            <label htmlFor="BoolFiled">Yes:</label>
            <input type="checkbox" name="BoolFiled" id="" onChange={() => setFiled(!filed)} />
          </div>
          {filed ? <div>
            <div className='rows'>
              <label htmlFor="DateFiled">Date Filed:</label>
              <input type="date" name="DateFiled" id="" />
            </div>
            <div className='rows'>
              <label htmlFor="StateFiled">State Filed:</label>
              <select name="StateFiled" id="">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
          </div>
            :
            null
          }
          <div className='rows'>
            <label htmlFor="MemberManage">Management by a Member:</label>
            <select name="MemberManag" id="">
              <option value="Manager">Manager Managed</option>
              <option value="Member">Member Managed</option>
              <option value="Board">Board of Directors</option>
              <option value="CEO">CEO or President managed</option>
            </select>
          </div>
          <div className='rows'>
            <label htmlFor="FS">Fiscal Year Start:</label>
            <input type="date" name="FS" id="" />
          </div>
          <div className="rows">
            <label htmlFor="FE">Fiscal Year End:</label>
            <input type="date" name="FE" id="" />
          </div>
          <h4>Shares</h4>
          <div className="rows">
            <label htmlFor="Shares">Shares A:</label>
            <input type="number" placeholder='Shares A #' />
          </div>
          <div className="rows">
            <label htmlFor="Shares">Shares B:</label>
            <input type="number" placeholder='Shares B #' />
          </div>
          <div className='rows'>
            <label htmlFor="ExShares">Ability to create shares:</label>
            <input type="checkbox" name="ExShares" id="" onChange={() => setShares(!shares)} />
          </div>
          {shares ? 
          <div className='rows'>
            <label htmlFor="ShareClass">Size of Share Class</label>
            <input type="number" name='ShareClass' placeholder='Size of Share Class' />
          </div>
          : 
          null
          }
          <div className='rows'>
          <label htmlFor="VotingMech">Voting Mechanism:</label>
          <select name="VotingMech" id="">
            <option value="Majority">Majority</option>
            <option value="Super">Super Majority</option>
            <option value="Unanimous">Unanimous</option>
          </select>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page