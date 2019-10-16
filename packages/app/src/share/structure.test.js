import Structure from './structure'

describe('Structure', () => {

  beforeEach(() => {
    sinon.spy(Structure.prototype, "_generateInfo");
  });

  afterEach(() => {
    Structure.prototype._generateInfo.restore()
  });

  it('checks if run only once _generateInfo method', () => {
    const st = new Structure({ posts: { name: 'string required' } })
    expect(st._generateInfo.getCalls().length).toBe(1)
  });

  it('checks if run only twice _generateInfo method', () => {
    const st = new Structure({
      posts: {
        firstname: 'string required',
        lastname: 'string required'
      }
    })
    expect(st._generateInfo.getCalls().length).toBe(2)
  });

  // Just an example
  // it('checks if run only once _generateInfo method', () => {
  //   const spy = jest.spyOn(Structure.prototype, '_generateInfo')
  //   const st = new Structure({ posts: { name: 'string required' } })
  //   expect(st._generateInfo).toHaveBeenCalledTimes(1);
  //   expect(st.structure.posts._fields[0].type).toBe('input')
  //   spy.mockRestore();
  // });

  it('checks if generate the fields', () => {
    const st = new Structure({ posts: { name: 'string required' } })
    expect(st.collections.posts.fields.length).toBe(1)
  });

});