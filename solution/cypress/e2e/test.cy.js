describe('test app api', () => {

  // 1. page 0 is not's default but it's first page
  // 2. sorting isn't working correcly  

  /// page
  it('check pagination in first page', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?page=0'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(2);
    })
  })

  it('check pagination in last page', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?page=2'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(1);
    })
  })

  /// limit
  it('check limit option when limit=1', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?limit=1'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(1);
    })
  })

  it('check limit option when limit=3', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?limit=3'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(3);
    })
  })

  it('check limit option when limit=5', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?page=0&limit=5'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(5);
    })
  })

  /// sort
  it('check sorting asc', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?sort=asc'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body[0].id <= res.body[1].id).to.be.true;
    })
  })

  it('check sorting desc', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?sort=desc'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body[0].id >= res.body[1].id).to.be.true;
    })
  })

  /// all three parameter
  it('check page, limit, sorting when page=0, limit=3, sort=asc', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?page=0&limit=3&sort=asc'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(3);
      expect(res.body[0].id <= res.body[1].id && res.body[1].id <= res.body[2].id).to.be.true;
    })
  })

  it('check page, limit, sorting when page=1, limit=2, sort=desc', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:9303/courses?page=1&limit=2&sort=desc'
    }).should((res)=>{
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(2);
      expect(res.body[0].id >= res.body[1].id).to.be.true;
    })
  })

})