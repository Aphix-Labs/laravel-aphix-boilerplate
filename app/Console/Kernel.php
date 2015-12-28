<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \BackupManager\Laravel\DbBackupCommand::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // backup
        $backupName = 'backups/' .  gmdate("Y_m_d_H:i:s", time());

        $schedule->command("db:backup
            --database=pgsql
            --destination=local
            --destinationPath=$backupName
            --compression=gzip")->daily();
    }
}
