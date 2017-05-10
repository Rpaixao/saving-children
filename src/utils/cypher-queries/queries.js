module.exports = {

    getChildrenListQuery(){
        return "MATCH (children)-[from]->(country), (children)-[supportedBy]->(organization) WHERE country.name = {countryName}  RETURN children,country,organization ORDER BY children.age ASC LIMIT 200";
    }

}