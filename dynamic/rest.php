<?php
    // Allow from any origin
    if(isset($_SERVER["HTTP_ORIGIN"]))
    {
        // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    }
    else
    {
        //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
        header("Access-Control-Allow-Origin: *");
    }

    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 600");    // cache for 10 minutes

    if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
    {
        if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
            header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

        if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        //Just exit with 200 OK with the above headers for OPTIONS method
        exit(0);
    }

	//	OUTPUT
	//	
    header("Content-Type: application/json");

    $_POST = json_decode(file_get_contents("php://input"),true);

    //  FUNCTIONS
    //
        function build_where($str,$re,$columns,$operators)
        {
            preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

            for($i=0;$i<count($matches);$i++)
            {
                if ( $matches[$i][1] === "C")
                {
                    $str = str_replace( $matches[$i][0], "".$columns->names[$matches[$i][2]]."" , $str );
                }
                else if ( $matches[$i][3] === "OP")
                {
                    $str = str_replace( $matches[$i][0], "".$operators[$matches[$i][4]]."" , $str );
                }
            } 

            return $str;
        }

    //  VARS
    //
        $columns = (object) [
            "names" => array(   "id",       "fullname", "nickname", "birthdate",    "age",      "email",    "salary",   "gender"    , "created_at"  ),
            "types" => array(   "NONE",     "STRING",   "STRING",   "STRING",       "NUMBER",   "STRING",   "NUMBER",   "STRING"    , "STRING "     ),
            "search" => array(  "NONE",     "LIKE",     "LIKE",     "LIKE",         "LIKE",     "LIKE",     "LIKE",     "EQ"        , "LIKE"        )   
        ];  

        $operators = array(
            "NEQ" => "!=", 
            "GTE" => ">=", 
            "LTE" => "<=",
            "GT" => ">", 
            "LT" => "<",
            "EQ" => "=",
            "LK" => "LIKE",
            "SW" => "LIKE",
            "EW" => "LIKE"
        );

        $re = '/(C)\[(\d+)]|(OP):(NEQ|GTE|LTE|LT|GT|EQ|LK|SW|EW)/m';

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
        //  IF NO CUSTOM PARAMETERS HAS BEEN DEFINED
        //
        $where="";

        //  IF NO CUSTOM PARMS AND GLOBAL SEARCH
        //
        if (  $_POST['customParameters'] === ""  && $_POST['search_mode']==="GLOBAL" )
        {
            $w = array();
            $jsonWhere = $_POST['search'];
            for($j=0;$j<count($columns->names);$j++)
            {
                if ( $columns->types[$j]!=="NONE")
                {
                    array_push( $w , "( C[".$j."] OP:LK '%".$jsonWhere."%' )");
                }

            }
            $where="".implode(" OR " , $w). "";
            
            $str = build_where("".$where."",$re,$columns,$operators);
            $where=" WHERE ".$str. " ";
        }
        //  IF NO CUSTOM PARMS AND GLOBAL MULTI
        //
        else if (  $_POST['customParameters'] === "" && $_POST['search_mode']==="MULTI" )
        {
            $jsonWhere = json_decode($_POST['search'],true);
            $w = array();

            for($j=0;$j<count($columns->names);$j++)
            {
                if ( $columns->types[$j]!=="NONE" && $jsonWhere[$j]!="" )
                {
                    if ( $columns->search[$j]==="LIKE")
                    {
                        array_push( $w , "( C[".$j."] OP:LK '%".$jsonWhere[$j]."%' )");
                    }
                    else if ( $columns->search[$j]==="EQ")
                    {
                        array_push( $w , "( C[".$j."] OP:EQ '".$jsonWhere."' )");
                    }
                }
            }

            $where="".implode(" AND " , $w). "";
            
            $str = build_where("".$where."",$re,$columns,$operators);
            $where=" WHERE ".$str. " ";
        }
        //  IF NO CUSTOM PARMS AND SEARCH NONE
        //
        else if (  $_POST['customParameters'] === "" && $_POST['search_mode']==="" )
        {
            $where="";
        }
        //  IF CUSTOM PARMS
        // 
        else
        {   
            $str = build_where("".$_POST['customParameters']."",$re,$columns,$operators);           
            $where=" WHERE ".$str. " ";
        }

    //  GET TOTAL ROWS - TOTAL PAGES
    //
        $total_pages_sql = "SELECT COUNT(*) FROM  _users ".$where."";
        $result = mysqli_query($conn,$total_pages_sql);

        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);        
    
    //  GET DATA RELATED TO THE RANGE
    //
        // $sql = "SELECT id,fullname,nickname,birthdate,age,email,salary,gender,created_at FROM _users ".$where." {{ORDER}} LIMIT $offset, $no_of_records_per_page";
        $sql = "SELECT ".implode(", " , $columns->names )." FROM _users ".$where." {{ORDER}} LIMIT $offset, $no_of_records_per_page";

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
    "searchMode" : "<?php echo $_POST['search_mode']; ?>"
}