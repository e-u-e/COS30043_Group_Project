import products from '../data/products.json'

const PHP_ENDPOINT = '/resources/products.php'

function applyLocalFilters(all, params) {
	let list = all.slice()
	const search = params.search ? String(params.search).toLowerCase() : ''
	const sort = params.sort || ''
	const page = params.page ? Number(params.page) : 1
	const pageSize = params.pageSize ? Number(params.pageSize) : 1000

	if (search) {
		list = list.filter(p => (p.name + ' ' + (p.category||'')).toLowerCase().includes(search))
	}

	if (sort === 'low') list.sort((a,b)=>a.price - b.price)
	if (sort === 'high') list.sort((a,b)=>b.price - a.price)

	const total = list.length
	const start = (page - 1) * pageSize
	const items = list.slice(start, start + pageSize)
	return { items, total }
}

export async function getProducts(params = {}) {
	//try to access backend
	try {
		const qs = new URLSearchParams(params).toString()
		const url = qs ? `${PHP_ENDPOINT}?${qs}` : PHP_ENDPOINT
		const res = await fetch(url)
		if (res.ok) {
			const data = await res.json()
			//backend returns { total, page, pageSize, items } or the aray
			if (data && data.items) return { items: data.items, total: data.total || data.items.length }
			if (Array.isArray(data)) return { items: data, total: data.length }
		}
	} catch (e) {
		//fallback just in case
	}

	//fallback to apply local filters
	return applyLocalFilters(products, params)
}

export async function getProductById(id) {
	try {
		const res = await fetch(`${PHP_ENDPOINT}?id=${encodeURIComponent(id)}`)
		if (res.ok) {
			const data = await res.json()
			//server may return product object or wrapped result
			if (data && data.items) {
				return data.items.length ? data.items[0] : null
			}
			return data
		}
	} catch (e) {}

	const p = products.find(x => x.id === Number(id))
	return Promise.resolve(p || null)
}

export default { getProducts, getProductById }
