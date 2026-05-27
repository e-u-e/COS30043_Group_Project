<?php
header('Content-Type: application/json');

$file = __DIR__ . '/../src/data/products.json';
if (!file_exists($file)) {
  echo json_encode([]);
  exit;
}

$data = json_decode(file_get_contents($file), true);

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$sort = isset($_GET['sort']) ? $_GET['sort'] : '';
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$pageSize = isset($_GET['pageSize']) ? max(1, intval($_GET['pageSize'])) : 1000;

if ($id) {
  foreach ($data as $p) {
    if (isset($p['id']) && intval($p['id']) === $id) {
      echo json_encode($p);
      exit;
    }
  }
  echo json_encode(null);
  exit;
}

//filter by search
if ($search !== '') {
  $s = strtolower($search);
  $data = array_filter($data, function($p) use ($s) {
    return strpos(strtolower($p['name']), $s) !== false || strpos(strtolower($p['category']), $s) !== false;
  });
  $data = array_values($data);
}

//sort
if ($sort === 'low') {
  usort($data, function($a, $b) { return $a['price'] <=> $b['price']; });
} else if ($sort === 'high') {
  usort($data, function($a, $b) { return $b['price'] <=> $a['price']; });
}

//paginate section
$total = count($data);
$start = ($page - 1) * $pageSize;
$paged = array_slice($data, $start, $pageSize);

echo json_encode(["total" => $total, "page" => $page, "pageSize" => $pageSize, "items" => array_values($paged)]);
?>