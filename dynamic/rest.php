<?php

    $_POST = json_decode(file_get_contents("php://input"),true);

    //  VARS
    //
        $columns = (object) [
            "names" => array(   "id",       "fullname", "nickname", "birthdate",    "age",      "email",    "salary",   "gender"),
            "types" => array(   "NONE",     "STRING",   "STRING",   "STRING",       "STRING",   "STRING",   "NUMBER",   "STRING"),
            "search" => array(  "NONE",     "LIKE",     "LIKE",     "LIKE",         "LIKE",     "LIKE",     "LIKE",     "EQ")
        ];  

    //  CUSTOM VARIABLES
    //
        // $columnNames = explode(",","id,fullname,nickname,birthdate,age,email,salary,gender");
        $columnNames = $columns->names;
        $jsonOrder = json_decode($_POST['order'],true);
        $order = array();

    //  VARIABLES
    //
        $pageno = (isset($_POST['pageno'])) ? $_POST['pageno'] : 666;
        $no_of_records_per_page = (isset($_POST['per_page'])) ? $_POST['per_page'] : 5;
        $offset = ($pageno-1) * $no_of_records_per_page;
        
    //  DATABASE CONNECTION
    //
        if (mysqli_connect_errno()){
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
            die();
        }
		$db_host		= 'localhost';
		$db_host		= '127.0.0.1';
		$db_user		= 'root';
		$db_pass		= '';
		$db_database	= 'rest'; 

		$conn = mysqli_connect($db_host,$db_user,$db_pass,$db_database) or die('Unable to establish a DB connection');
		mysqli_query($conn,"SET names UTF8");

    //  WHERE
    //
        $where="";
        $jsonWhere = json_decode($_POST['search'],true);
        
        // if ( count($jsonWhere)===0)
        if ( $_POST['search_mode']==="")
        {
            $where="";
        }
        // else if ( count($jsonWhere)===1)
        else if ( $_POST['search_mode']==="GLOBAL")
        {
            $w = array();
            $jsonWhere = $_POST['search'];
            for($j=0;$j<count($columns->names);$j++)
            {
                if ( $columns->types[$j]!=="NONE")
                {
                    // array_push( $w , " ".$columns->names[$j]." like '%".$jsonWhere[0]."%'" );
                    array_push( $w , " ".$columns->names[$j]." like '%".$jsonWhere."%'" );
                }
            }
            $where=" WHERE ".implode(" OR " , $w). " ";
        }
        else
        {
            $w = array();
            for($j=0;$j<count($columns->names);$j++)
            {
                if ( $columns->types[$j]!=="NONE" && $jsonWhere[$j]!="" )
                {
                    if ( $columns->search[$j]==="LIKE")
                    {
                        array_push( $w , " ".$columns->names[$j]." like '%".$jsonWhere[$j]."%'" );
                    }
                    else if ( $columns->search[$j]==="EQ")
                    {
                        array_push( $w , " ".$columns->names[$j]." = '".$jsonWhere[$j]."'" );
                    }
                }
            }
            $where=" WHERE ".implode(" AND " , $w). " ";
        }

    //  GET TOTAL ROWS - TOTAL PAGES
    //
        $total_pages_sql = "SELECT COUNT(*) FROM  _users ".$where."";
        $result = mysqli_query($conn,$total_pages_sql);

        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);        
    
    //  GET DATA RELATED TO THE RANGE
    //
        $sql = "SELECT id,fullname,nickname,birthdate,age,email,salary,gender FROM _users ".$where." {{ORDER}} LIMIT $offset, $no_of_records_per_page";

    //  REPLACE ORDER
    //
        $orderStatement = " ";
        if( count($jsonOrder)!== 0 )
        {
            for($i=0;$i<count($jsonOrder);$i++)
            {
                array_push( $order , " ".$columnNames[$jsonOrder[$i]["p"]]." ".$jsonOrder[$i]["o"]." ");
            }
            $orderStatement = "order by ".implode(", ",$order)." ";
        }

        // $sql = str_replace("{{ORDER}}"," order by id asc " , $sql);
        $sql = str_replace("{{ORDER}}"," ".$orderStatement." " , $sql);
        
    //  GET RESULT
    //
        $res_data = mysqli_query($conn,$sql);        

        $emparray = array();
        while($row = mysqli_fetch_array($res_data,MYSQLI_NUM)){

            $emparray[] = $row;
        }        
?>
{
    "totalRows" : <?php echo $total_rows; ?>,
    "totalPages" : <?php echo $total_pages; ?>,
    "records" : <?php echo json_encode($emparray); ?>,
    "query" : "<?php echo $sql; ?>",
    "where" : "<?php echo $where; ?>",
    "total_pages_sql" : "<?php echo $total_pages_sql; ?>"
}