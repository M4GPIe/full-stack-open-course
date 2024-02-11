const AddBlogs = ({title, handleTitleChange, url, handleUrlChange, onSubmit})=>{
    return(
        <form onSubmit={onSubmit}>
            <div>
                Title: <input value={title} onChange={handleTitleChange} />
            </div>
            <div>
                URL: <input value={url} onChange={handleUrlChange} />
            </div>
            <div>
                <button type="submit">Create Blog</button>
            </div>
        </form>
    )
}

export default AddBlogs