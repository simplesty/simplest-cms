import React from 'react'
import { connect } from 'react-redux'

const Dashboard = () => {
  return (
    <div>
      <h3>Welcome...</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    collections: state.collections,
  }
}

export default connect(mapStateToProps)(Dashboard)
