import Loading from "../Loading/Loading"

const RenderForm = ({mode , handleSubmit , handleBlur, warnings , formData, handleChange , loading}) => {
  return (
    <form onSubmit={handleSubmit} className="col-md-4">
              <h3 className='mb-2'>{mode === 'edit' ? 'Edit' : 'Add'}</h3>
              {warnings?.name && <small style={{ color: "red" }}>{warnings.name}</small>}
              <input
                type="text"
                placeholder="Name"
                name='name'
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control mb-3"
              />
              {warnings?.description && <small style={{ color: "red" }}>{warnings.description}</small>}
              <textarea
                placeholder="Description"
                value={formData.description}
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control mb-3"
              ></textarea>
              <div className="input-group">
                <input
                  type="text"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="form-control rounded-left mb-3"
                  style={{ maxWidth: '100px' }} 
                  placeholder="e.g. +961"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                 className="form-control mb-3"
                  placeholder="Phone Number"
                />
              </div>
              <button  className="btn btn-primary w-100">
                {loading ? <Loading text={mode === "edit" ? `updating item...` : `adding item...`}/> :
                 ( mode === "edit" ? "Edit Item" : "Add Item") }
              </button>
    </form>
  )
}

export default RenderForm


