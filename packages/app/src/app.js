import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from './redux/actions'
import Layout from './components/layout'
import CollectionIndex from './components/collectionIndex'
import CollectionNew from './components/collectionNew'
import CollectionEdit from './components/collectionEdit'
import Dashboard from './components/dashboard'
import AutoSave from './components/autosave'

function App(props) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (loading) {
      props.fetchCollections().then(() => {
        setLoading(false)
      })
    }
  })

  if (loading) return <div>Loading data...</div>

  return (
    <div className="app">
      {window.config.autosave && <AutoSave />}
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/collections/:collection" component={CollectionIndex} />
            <Route exact path="/collections/:collection/new" component={CollectionNew} />
            <Route exact path="/collections/:collection/:uid" component={CollectionEdit} />
          </Switch>
        </Layout>
      </Router>
    </div>
  )
}

const mapDispatchToProps = {
  fetchCollections: actions.collections.all,
}

export default connect(
  null,
  mapDispatchToProps
)(App)
