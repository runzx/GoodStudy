
const a={b:'b'}
const b={c:'c'}
const dd={e:{f:'f'}}
process.env.DATABASE = undefined //a.DATABASE
a.c=b.d
dd.e.g=b.d
console.log(a,dd,process.env.DATABASE)