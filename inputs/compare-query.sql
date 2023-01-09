SELECT
    cpc.start_time,
    cpc.end_time,
    load_type,
    load_weight,
    process_type_id,
    load_nominal_weight AS task_nominal_weight,
    load_type_quantity AS task_load_type_quantity,
    product_id,
    location_id,
    task_location_relation_type
FROM
    crane_pick_cycles cpc
    LEFT JOIN crane_cycle_tasks cct ON cpc.id = cct.cycle_id
    LEFT JOIN site_tasks st ON cct.task_id = st.id
    LEFT JOIN task_products tp ON tp.task_id = st.id
    LEFT JOIN site_tasks_locations stl ON stl.task_id = st.id
WHERE
    cpc.id = ?