import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Form from './components/form'
import Structure from './share/structure'
import actions from './redux/actions'

// const structure = {
//   posts: {
//     firstname: 'string required',
//     lastname: 'string required',
//     city: 'string required',
//   },
// }

// const st = new Structure(structure)

const mapStateToPropsMenu = state => {
  return {
    collections: state.collections.names,
  }
}

const Menu = connect(mapStateToPropsMenu)(props => {
  console.log(props.collections)
  return (
    <ul>
      {props.collections.map(collection => (
        <li key={collection.name}>
          <NavLink to={`collections/${collection.name}/`}>{collection.name}</NavLink>
        </li>
      ))}
    </ul>
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
  return <div></div>
  // <Form fields={st.users.fields} />
})

// ---------------------------------------------------

const mapStateToPropsCollectionIndexPage = (state, props) => {
  return {
    collection: state.collections.items[props.match.params.id],
  }
}

const CollectionIndexPage = connect(mapStateToPropsCollectionIndexPage)(props => {
  return (
    <div>
      {Object.keys(props.collection.data).map(key => {
        const item = props.collection.data[key]
        return <li key={item._uid}>{JSON.stringify(item)}</li>
      })}
    </div>
  )
  // <Form fields={st.users.fields} />
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

  console.log('APP RENDER')

  return (
    <div className="app">
      <Router>
        <Layout>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/collections/:id" component={CollectionIndexPage} />
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
