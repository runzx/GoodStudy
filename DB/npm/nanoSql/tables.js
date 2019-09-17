/* 
Type  Description
any, blob	    
      These types will not actually type cast, just pass through whatever value is provided.
safestr	      
      A safe string type, automatically replaces HTML entities with HTML special characters.
string	      
      Simple string type.
int	          
      Integer type, floating point numbers will be rounded to the nearest whole number. Strings will be parsed into integers. Everything else becomes zero. Works with auto increment as primary key type.
number, float	
      Floating point type, numbers will pass through, strings will be converted to numbers using parseFloat, everything else will become a zero.
array	        
      Same as any[]
uuid, timeId, timeIdms	
      An extension of the string type. Doesn't perform any validation beyond making sure the value is a string. If any of these are used in a primary key column they will autogenerate as needed.
object, obj, map	
      Only allows javascript objects {} into the column.
boolean, bool	
      true and the number 1 resolve to true, everything else resolves to false.
date	
      ISO8601 date field
geo	
      An object containing lat and lon properties, represents a geographic coordinate.
      
Any type is also supported as an array or array of arrays, (or arrays of arrays of arrays...) examples: 
  any[], any[][], number[], string[], etc...

Primary Keys cannot be geo, object, obj, array or map types.
 */

nSQL()
  .query('create table', {
    name: 'users',
    model: {
      'id:uuid': { pk: true }, // pk = primary key
      'name:string': {},
      'meta:obj[]': {
        // array of objects
        model: {
          'key:string': {},
          'value:any': {},
          'details:obj': {
            // nested object
            model: {
              'detail1:string': { default: '' },
              'detail2:string': { default: '' }
            }
          }
        }
      }
    }
  })
  .exec()
  .then(row => {
    row = {
      id: 'de1decb9-5e8a-420a-a578-ae46555977d6',
      name: 'Jeb',
      meta: [
        {
          key: 'some key',
          value: 'some value',
          details: {
            detail1: 'hello',
            detail2: 'world'
          }
        }
      ]
    }
  })

  // mysql 表结构
  CREATE TABLE `nanoSql_db_cfc7-e628` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `data` blob DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4

  data={"id":1,"title":"米7手机","price":3500,"sku":[{"key":"color","value":"black"}]}
