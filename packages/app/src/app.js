import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Form from './components/form'
import actions from './redux/actions'

// ---------------------------------------------------

const mapStateToPropsMenu = state => {
  return {
    collections: state.collections.names,
    items: state.collections.items,
  }
}

const Menu = connect(mapStateToPropsMenu)(props => {
  const handleSaveAll = () => {
    const normalize = {}
    Object.keys(props.collections).forEach(key => {
      const collectionName = props.collections[key].name
      normalize[collectionName] = props.items[collectionName].data
    })
    console.log('NORMALIZE')
    console.log(JSON.stringify(normalize))

    // fetch(window.baseurl + '/index.php', {
    fetch('http://localhost:8001/api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ colletions: normalize }),
    })
      .catch(error => console.log('Error:', error))
      .then(res => res.json())
      .then(result => {
        console.log('RESULT', result)
      })
  }
  return (
    <div>
      <button type="button" onClick={handleSaveAll}>
        SAVE ALL
      </button>

      <ul>
        {props.collections.map(collection => (
          <li key={collection.name}>
            <NavLink to={`/collections/${collection.name}/`}>{collection.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
})

// ---------------------------------------------------

const Layout = props => {
  return (
    <div className="wrapper">
      <header>
        <h1>Simplest CMS</h1>
      </header>
      <div className="middle">
        <nav>
          <Menu />
        </nav>
        <section className="main">{props.children}</section>
      </div>
    </div>
  )
}

// ---------------------------------------------------

const mapStateToPropsExample = state => {
  return {
    collections: state.collections,
  }
}

const Dashboard = connect(mapStateToPropsExample)(props => {
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  )
})

// ---------------------------------------------------

const mapStateToPropsCollectionIndexPage = (state, props) => {
  return {
    collection: state.collections.items[props.match.params.collection],
  }
}

const mapDispatchToPropsCollectionIndexPage = {
  delete: actions.collections.delete,
}

const CollectionIndexPage = connect(
  mapStateToPropsCollectionIndexPage,
  mapDispatchToPropsCollectionIndexPage
)(props => {
  const gotoCreatePage = () => {
    props.history.push('/collections/' + props.match.params.collection + '/new')
  }
  const handleDelete = item => () => {
    props.delete(props.match.params.collection, item._uid)
  }
  return (
    <div>
      <button onClick={gotoCreatePage}>add +</button>
      <ul>
        {Object.keys(props.collection.data).map(key => {
          const item = props.collection.data[key]
          return (
            <li key={item._uid}>
              {JSON.stringify(item)}{' '}
              <NavLink to={`/collections/${props.match.params.collection}/${item._uid}`}>
                Edit
              </NavLink>
              <button onClick={handleDelete(item)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

// ---------------------------------------------------

const mapStateToPropsCollectionEditPage = (state, props) => {
  return {
    fields: state.collections.items[props.match.params.collection].fields,
    item: state.collections.items[props.match.params.collection].data[props.match.params.uid],
  }
}

const mapDispatchToPropsCollectionEditPage = {
  save: actions.collections.save,
}

const CollectionEditPage = connect(
  mapStateToPropsCollectionEditPage,
  mapDispatchToPropsCollectionEditPage
)(props => {
  const handleSubmit = values => {
    props
      .save(props.match.params.collection, { ...values, _uid: props.match.params.uid })
      .then(() => {
        props.history.push('/collections/' + props.match.params.collection)
      })
  }

  return (
    <div>
      <h4>Edit</h4>
      <Form fields={props.fields} initValues={props.item} onSubmit={handleSubmit} />
    </div>
  )
})
// ---------------------------------------------------

const mapStateToPropsCollectionCreatePage = (state, props) => {
  return {
    fields: state.collections.items[props.match.params.collection].fields,
    item: state.collections.items[props.match.params.collection].data[props.match.params.uid],
  }
}

const mapDispatchToPropsCollectionCreatePage = {
  save: actions.collections.save,
}

const CollectionCreatePage = connect(
  mapStateToPropsCollectionCreatePage,
  mapDispatchToPropsCollectionCreatePage
)(props => {
  const handleSubmit = values => {
    props.save(props.match.params.collection, { ...values, _uid: +new Date() }).then(() => {
      props.history.push('/collections/' + props.match.params.collection)
    })
  }

  return (
    <div>
      <h4>Create New</h4>
      <Form fields={props.fields} onSubmit={handleSubmit} />
    </div>
  )
})

// ---------------------------------------------------

function App(props) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (loading) {
      props.fetchCollections().then(() => {
        setLoading(false)
      })
    }
  })

  if (loading) return <div>Loading...</div>

  return (
    <div className="app">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/collections/:collection" component={CollectionIndexPage} />
            <Route exact path="/collections/:collection/new" component={CollectionCreatePage} />
            <Route exact path="/collections/:collection/:uid" component={CollectionEditPage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  fetchCollections: actions.collections.all,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
