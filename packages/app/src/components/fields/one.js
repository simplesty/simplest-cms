import React from 'react'
import { useSelector } from 'react-redux'
import Select from './select'

const RelationToOne = ({ info, ...props }) => {
  const data = useSelector(state => state.collections.items[info.relation.collection].data)
  const options = Object.keys(data).reduce((acc, key) => {
    acc.push({
      value: data[key]._uid,
      label: data[key][info.relation.label_field],
    })
    return acc
  }, [])

  return <Select info={{ ...info, options }} {...props} />
}

export default RelationToOne
