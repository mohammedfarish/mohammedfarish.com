function runMiddleware(req) {

    // return console.log(req.headers('x-auth-token'))
    req.test = 'this is s test'
    return console.log('test middleware')

}

export default runMiddleware;