<?php

    use Phinx\Migration\AbstractMigration;

    class DatabaseProjectMigration extends AbstractMigration{
        private $tbl_name = "database_projects";

        public function up() {
            $table = $this->table($this->tbl_name);
            $table->addColumn('name', 'string' , ['default' => ''])
                  ->addColumn('slug' , 'string' , ['default' => ''])
                  ->addColumn('type' , 'string' , ['default' => 'project'])
                  ->create();
        }

        public function down()
        {
            $this->table($this->tbl_name)->drop()->save();
        }
    }

?>
