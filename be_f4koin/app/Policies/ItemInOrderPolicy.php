<?php

namespace App\Policies;

use App\Models\User;
use App\Models\item_in_order;
use Illuminate\Auth\Access\HandlesAuthorization;

class ItemInOrderPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\item_in_order  $itemInOrder
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, item_in_order $itemInOrder)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\item_in_order  $itemInOrder
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, item_in_order $itemInOrder)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\item_in_order  $itemInOrder
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, item_in_order $itemInOrder)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\item_in_order  $itemInOrder
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, item_in_order $itemInOrder)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\item_in_order  $itemInOrder
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, item_in_order $itemInOrder)
    {
        //
    }
}
