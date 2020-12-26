// 使用限制和跳过的简单分页：
const link = (obj, { pageSize = 10, page = 0 }) => {
  return Foo.find()
    .skip(page*pageSize)
    .limit(pageSize)
    .exec()
}

// 使用_id作为游标：
const link = (obj, { pageSize = 10, cursor }) => {
  const params = cursor ? {'_id': {'$gt': cursor}} : undefined
  return Foo.find(params).limit(pageSize).exec()
}

// Pagination argument type to represent offset and limit arguments
const PaginationArgType = new GraphQLInputObjectType({
  name: 'PaginationArg',
  fields: {
    offset: {
      type: GraphQLInt,
      description: "Skip n rows."
    },
    first: {
      type: GraphQLInt,
      description: "First n rows after the offset."
    },
  }
})
 
// Function to generate paginated list type for a GraphQLObjectType (for representing paginated response)
// Accepts a GraphQLObjectType as an argument and gives a paginated list type to represent paginated response.
const PaginatedListType = (ItemType) => new GraphQLObjectType({
  name: 'Paginated' + ItemType, // So that a new type name is generated for each item type, when we want paginated types for different types (eg. for Person, Book, etc.). Otherwise, GraphQL would complain saying that duplicate type is created when there are multiple paginated types.
  fields: {
    count: { type: GraphQLInt },
    items: { type: new GraphQLList(ItemType) }
  }
})
 
// Type for representing a single item. eg. Person
const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
  }
})
 
// Query type which accepts pagination arguments with resolve function
const PersonQueryTypes = {
  people: {
    type: PaginatedListType(PersonType),
    args: { 
      pagination: { 
        type: PaginationArgType, 
        defaultValue: { offset: 0, first: 10 } 
      },
    },
    resolve: (_, args) => {
      const { offset, first } = args.pagination
      // Call MongoDB/Mongoose functions to fetch data and count from database here.
      return {
        items: People.find().skip(offset).limit(first).exec()
        count: People.count()
      }
    },
  }
}
 
const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    ...PersonQueryTypes,
  },
});
 
const Schema = new GraphQLSchema({
  query: QueryType
})

// 当查询时：
{
  people(pagination: {offset: 0, first: 10}) {
    items {
      id
      name
    }
    count
  }
}