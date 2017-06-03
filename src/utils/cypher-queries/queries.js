module.exports = {

    getChildrenListQuery(){
        return "MATCH (children)-[from]->(country), (children)-[supportedBy]->(organization) WHERE country.name = {countryName}  RETURN children,country,organization ORDER BY children.age ASC LIMIT 20";
    },

    getChildrenListByAgeQuery(){
        return "MATCH (children)-[from]->(country), (children)-[supportedBy]->(organization) WHERE country.name = {countryName} and children.age = {age} RETURN children,country,organization ORDER BY children.age ASC LIMIT 20";
    },

    getTotalChildrenByCountry(){
        return "MATCH (children:Children)-[:from]->(country:Country) RETURN country.name, country.lat, country.lng, count(children)";
    },

    getTotalChildrenByAgeGroupByCountry(){
        return "MATCH (children:Children)-[:from]->(country:Country) WHERE children.age = {age} RETURN country.name, country.lat, country.lng, count(children)";
    },

    getChildrenQuery(){
        return "MATCH (children)-[from]->(country), (children)-[supportedBy]->(organization) WHERE children.key = {childrenID}  RETURN children,country,organization";
    },

}