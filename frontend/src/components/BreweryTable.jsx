function BreweryTable({ items, onEdit, onDelete }) {
  if (!items.length) {
    return <div className="empty">No breweries found.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const type = item.breweryType || item.brewery_type || '';
            const website = item.websiteUrl || item.website_url || item.website || '';
            return (
              <tr key={item.id || item._id || `${item.name}-${item.city}`}>
                <td>{item.name}</td>
                <td>{type}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
                <td>
                  {website ? (
                    <a href={website} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="button ghost"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button danger"
                      onClick={() => onDelete(item.id || item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BreweryTable;
