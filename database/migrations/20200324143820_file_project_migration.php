<?php
    use Phinx\Migration\AbstractMigration;

    class FileProjectMigration extends AbstractMigration {
        private $tbl_name = "file_projects";

        public function up() {
            $table = $this->table($this->tbl_name);
            $table->addColumn('name', 'string' , ['default' => ''])
                ->addColumn('path' , 'string' , ['default' => ''])
                ->addColumn('type' , 'string' , ['default' => 'project'])
                ->create();
        }

        public function down()
        {
            $this->table($this->tbl_name)->drop()->save();
        }
    }
?>
