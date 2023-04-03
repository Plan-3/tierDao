'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './form.module.css'
import { useMutation } from '@apollo/client'
import { MUTATION_CREATEOPERATINGAGREEMENT } from '@/lib/utils/graphql/Queries'
import {
  entityName,
  businessType,
  ownership,
  initialMembers,
  articlesFiled,
  dateFiled,
  stateFiled,
  management,
  fiscalYearStart,
  fiscalYearEnd,
  sharesA,
  sharesB,
  createShares,
  sizeOfShares,
  votingMech,
  handleName,
  handleBusinessType,
  handleOwnership,
  handleInitialMembers,
  handleArticlesFiled,
  handleDateFiled,
  handleStateFiled,
  handleManagement,
  handleMonth,
  handleDate,
  handleSharesA,
  handleSharesB,
  handleCreateShares,
  handleSizeOfShares,
  handleVotingMech
} from './handlers'

export interface operatingAgreement {
  entityName: string,
  businessType: string,
  ownership: string,
  initialMembers: string[],
  articlesFiled: boolean,
  dateFiled: string,
  stateFiled: string,
  management: string,
  fiscalYearStart: number[],
  fiscalYearEnd: number[],
  sharesA: number,
  sharesB: number,
  shares: boolean,
  shareSize: number,
  votingMechanism: string
}



function page() {
  const [shares, setShares] = useState(false)
  const [filed, setFiled] = useState(false)
  const [operatingAgreement, setOperatingAgreement] = useState<operatingAgreement | undefined>(undefined)
  const [createOperatingAgreement, { error }] = useMutation(MUTATION_CREATEOPERATINGAGREEMENT)

  const handleSubmit = (event: any) => {
    
    let operatingAgreement: operatingAgreement = {
      entityName: entityName,
      businessType: businessType,
      ownership: ownership,
      initialMembers: initialMembers,
      articlesFiled: articlesFiled,
      dateFiled: dateFiled,
      stateFiled: stateFiled,
      management: management,
      fiscalYearStart: fiscalYearStart,
      fiscalYearEnd: fiscalYearEnd,
      sharesA: sharesA,
      sharesB: sharesB,
      shares: createShares,
      shareSize: sizeOfShares,
      votingMechanism: votingMech
    }
    console.log(operatingAgreement)
    createOperatingAgreement({ variables: { entityName: operatingAgreement.entityName, businessType: operatingAgreement.businessType, ownership: operatingAgreement.ownership, initialMembers: operatingAgreement.initialMembers, articlesFiled: operatingAgreement.articlesFiled, dateFiled: operatingAgreement.dateFiled, stateFiled: operatingAgreement.stateFiled, management: operatingAgreement.management, fiscalYearStart: operatingAgreement.fiscalYearStart, fiscalYearEnd: operatingAgreement.fiscalYearEnd, sharesA: operatingAgreement.sharesA, sharesB: operatingAgreement.sharesB, shares: operatingAgreement.shares, shareSize: operatingAgreement.shareSize, votingMechanism: operatingAgreement.votingMechanism } })
  }
  return (
    <div className={styles.div}>
      <Link href='/'>Home</Link>
      <div className={styles.div}>
        {/* add mutation later */}
        <form className={styles.form} action="">
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="EN">Entity Name:</label>
            <input type="text" name="EN" id="" placeholder='Entity Name' onChange={(event) => handleName(event)}/>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="Business Type">Business Type:</label>
            <select name="Business Type" id="" onChange={(event)=> handleBusinessType(event)}>
              <option value="LLC">LLC</option>
              <option value="S-Corp">S-Corp</option>
              <option value="C-Corp">C-Corp</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="Ownership">Ownership:</label>
            <select name="Ownership" id="" onChange={(event)=> handleOwnership(event)}>
              <option value="Sole" selected>Sole Propriertorship</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="InitMems" style={{ fontSize: '.8rem' }}>Initial Members. Please seperate members with a comma:</label>
            <input type="text" name="InitMems" id="" placeholder='Initial Members' onChange={(event)=> handleInitialMembers(event)}/>
          </div>
          <h4>Articles Filed</h4>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="BoolFiled">Yes:</label>
            <input type="checkbox" name="BoolFiled" id="" onChange={(event) =>{
               setFiled(!filed)
               handleArticlesFiled(event)
               }} />
          </div>
          {filed ? <div>
            <div className={styles.rows}>
              <label className={styles.label} htmlFor="DateFiled">Date Filed:</label>
              <input type="date" name="DateFiled" id="" onChange={(event)=> handleDateFiled(event)}/>
            </div>
            <div className={styles.rows}>
              <label className={styles.label} htmlFor="StateFiled" >State Filed:</label>
              <select name="StateFiled" id="" onChange={(event) => handleStateFiled(event)}>
                <option value="AL" selected>Alabama</option>
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
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="MemberManage">Management by a Member:</label>
            <select name="MemberManag" id="" onChange={(event) => handleManagement(event)}>
              <option value="Manager" selected>Manager Managed</option>
              <option value="Member">Member Managed</option>
              <option value="Board">Board of Directors</option>
              <option value="CEO">CEO or President managed</option>
            </select>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="FS">Fiscal Year Start:</label>
            <select name="FS" id="" onChange={(event) => handleMonth(event)}>Month
              <option value="1" selected>Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select name="FS" id="Day" onChange={(event) => handleDate(event)}>
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <div className="rows">
            <label className={styles.label} htmlFor="FE">Fiscal Year End:</label>
            <select name="FE" id="" onChange={(event) => handleMonth(event)}>Month
              <option value="1" selected>Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select name="FE" id="Day" onChange={(event) => handleDate(event)}>
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <h4>Shares</h4>
          <div className="rows">
            <label className={styles.label} htmlFor="Shares">Shares A:</label>
            <input type="number" placeholder='Shares A #' onChange={(event) => handleSharesA(event)}/>
          </div>
          <div className="rows">
            <label className={styles.label} htmlFor="Shares">Shares B:</label>
            <input type="number" placeholder='Shares B #' onChange={(event) => handleSharesB(event)}/>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="ExShares">Ability to create shares:</label>
            <input type="checkbox" name="ExShares" id="" onChange={(event) => {
              setShares(!shares)
              handleCreateShares(event)
              }} />
          </div>
          {shares ? 
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="ShareClass">Size of Share Class</label>
            <input type="number" name='ShareClass' placeholder='Size of Share Class' onChange={(event) => handleSizeOfShares(event)}/>
          </div>
          : 
          null
          }
          <div className={styles.rows}>
          <label className={styles.label} htmlFor="VotingMech" >Voting Mechanism:</label>
          <select name="VotingMech" id="" onChange={(event) => handleVotingMech(event)}>
            <option value="Majority" selected>Majority</option>
            <option value="Super">Super Majority</option>
            <option value="Unanimous">Unanimous</option>
          </select>
          </div>
          <button className={styles.btnSub} onClick={(event)=> handleSubmit(event)}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page