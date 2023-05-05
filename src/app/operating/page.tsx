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
    event.preventDefault()
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
            <input type="text" name="EN" id="" placeholder='Entity Name' onChange={(event) => handleName(event)} />
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="StateFiled" >State Filed:</label>
            <select name="StateFiled" id="" onChange={(event) => handleStateFiled(event)}>
              <option value=""></option>
              <option value="AL" >Alabama</option>
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
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="Business Type">Business Type:</label>
            <select name="Business Type" id="" onChange={(event) => handleBusinessType(event)}>
              <option value=""></option>
              <option value="LLC">LLC</option>
              <option value="S-Corp">S-Corp</option>
              <option value="C-Corp">C-Corp</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.rows}>
            <h4>Entity's Primary Address</h4>
            <p>If you don't have a physical business address, use the address of one of the LLC's Members. Do not use a P.O. Box here.</p>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="addr1" />
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
            <div className={styles.rows}>
            <label className={styles.label} htmlFor="StateFiled" >State Filed:</label>
            <select name="StateFiled" id="" onChange={(event) => handleStateFiled(event)}>
              <option value=""></option>
              <option value="AL" >Alabama</option>
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
            <label htmlFor="zip">Zipcode</label>
            <input type="text" name="zip" id="zip" />
          </div>
          <div className={styles.rows}>
            <label htmlFor="effectiveDate">Entity Effective Date</label>
            <input type="date" name="effectiveDate" id="eDate" />
          </div>
          <div className={styles.rows}>
            <label htmlFor="purpose">Purpose</label>
            <textarea name="purpose" id="purpose" cols={30} rows={10}></textarea>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="InitMems" style={{ fontSize: '.8rem' }}>Initial Members. Please seperate members with a comma:</label>
            <input type="text" name="InitMems" id="" placeholder='Initial Members' onChange={(event) => handleInitialMembers(event)} />
          </div>
          <div className={styles.rows}>
            <h4>Registered Agent Address</h4>
            <p>Include either the full name of the individual serving as the registered agent or, if a company, the full name of the company. Do not use a P.O. Box as an address.</p>
            <label htmlFor="regName">Name</label>
            <input type="text" name="regName" id="regName" />
            <label htmlFor="regaddress">Address</label>
            <input type="text" name="regaddress" id="regaddr1" />
            <label htmlFor="city">City</label>
            <input type="text" name="regcity" id="regcity" />
            <div className={styles.rows}>
            <label className={styles.label} htmlFor="StateFiled" >State Filed:</label>
            <select name="StateFiled" id="" onChange={(event) => handleStateFiled(event)}>
              <option value=""></option>
              <option value="AL" >Alabama</option>
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
            <label htmlFor="regzip">Zipcode</label>
            <input type="text" name="regzip" id="regzip" />
          </div>
          <div className={styles.rows}>
            <h4>How long will llc last</h4>
            <input type="radio" name="indef" id="indef" />
            <input type="radio" name="endDate" id="endDate" />
          </div>
          <div className={styles.rows}>
            <h4>Voting between members</h4>
            <input type="radio" name="equalVote" id="equalVote" />
            <input type="radio" name="proportionalVote" id="proportionalVote" />
          </div>
          <div className={styles.rows}>
            <h4>How will profits be distributed</h4>
            <select name="distFrequency" id="distFrequency">
              <option value=""></option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annual">Semi-Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div className={styles.rows}>
            <label className={styles.label} htmlFor="Ownership">Ownership:</label>
            <select name="Ownership" id="" onChange={(event) => handleOwnership(event)}>
              <option value=""></option>
              <option value="Member-Managed">Member-Managed</option>
              <option value="Manager-Managed">Manager-Managed</option>
            </select>
          </div>
          <div className={styles.rows}>
            <h4>Will LLC appoint officers</h4>
            <input type="radio" name="yes" id="yes" />
            <input type="radio" name="no" id="no" />
          </div>
          <div className={styles.row}>
            <h4>When will fiscal year end</h4>
            <p>Fiscal year will end on last day of month selected</p>
            <select name="FS" id="" onChange={(event) => handleMonth(event)}>Month
              <option value=""></option>
              <option value="01" >Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
          <div className={styles.rows}>
            <h4>Is the LLC requesting corporate tax treatment from the IRS?</h4>
            <input type="radio" name="yes" id="yes" />
            <input type="radio" name="no" id="no" />
          </div>
          <button className={styles.btnSub} onClick={(event) => handleSubmit(event)}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page