<?php

use Phinx\Migration\AbstractMigration;

class RecordMigration extends AbstractMigration {
    private $tbl_name = "records";

    public function up() {
        $table = $this->table($this->tbl_name);
        $table->addColumn('project', 'string' , ['default' => ''])
            ->addColumn('name' , 'string' , ['default' => ''])
            ->addColumn('content' , 'string' , ['default' => ''])
            ->addColumn('ext' , 'string' , ['default' => ''])
            ->addColumn('type' , 'string' , ['default' => 'record'])
            ->create();
    }

    public function down()
    {
        $this->table($this->tbl_name)->drop()->save();
    }
}

?>
