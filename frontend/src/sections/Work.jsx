export default function Work({ workItems }) {
  return (
    <section id="work" className="py-5 bg-minegens-dark border-top border-minegens">
      <div className="container-xl py-4 fade-in-simple">
        <div className="mb-4">
          <span className="text-uppercase tracking-widest fw-bold text-sm" style={{ color: '#2f74ff' }}>Our Features</span>
          <h2 className="display-6 fw-bold text-white mt-1">What we are building.</h2>
        </div>
        
        <div className="row g-4">
          {workItems.map((item, i) => (
            <div key={i} className="col-100 col-sm-6 col-xl-3">
              <article className="h-100 rounded-4 border border-minegens p-4 bg-minegens-surface hover-premium">
                <div className="mb-2" style={{ color: '#2f74ff', fontSize: '20px' }}>🔹</div>
                <h3 className="h6 fw-bold text-white mb-2">{item.title}</h3>
                <p className="text-white-50 small mb-0" style={{ lineHeight: '1.6', fontSize: '13px' }}>{item.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}